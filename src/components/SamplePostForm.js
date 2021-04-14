import { useRouter } from "next/router"
import { Form } from "react-final-form"
import { InputControl, SelectControl, TextareaControl } from "@/components/form-fields"
import { Box, Button, ButtonGroup, useToast } from "@chakra-ui/react"
import { useUsers } from "@/hooks/useUserQueries"
import { useCreatePost, useUpdatePost, useDeletePost } from "@/hooks/usePostMutations"

const onSubmit = (values, createPost, updatePost, deletePost, toast, router) => {
  if (values.action === "create") {
    createPost(values, {
      onSuccess: (post) => {
        router.push(`/edit/${post.id}`)
        toast({
          title: "Post created !",
          description: "Your post is successfully created.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      },
    })
  }
  if (values.action === "update") {
    updatePost(values)
  }
  if (values.action === "delete") {
    deletePost(values.id)
  }
}

const validateForm = (values) => {
  const errors = {}

  if (values.action !== "delete") {
    if (!values.title) {
      errors.title = "Post title required."
    }
    if (!values.userId || values.userId.length === 0) {
      errors.userId = "User required."
    }
  }

  return errors
}

export const SamplePostForm = ({ post = null }) => {
  const toast = useToast()
  const router = useRouter()
  const { data: users, status: usersStatus } = useUsers()
  const { mutate: createPost, status: createPostStatus } = useCreatePost()
  const { mutate: updatePost, status: updatePostStatus } = useUpdatePost()
  const { mutate: deletePost, status: deletePostStatus } = useDeletePost()
  const status = post === null ? createPostStatus : updatePostStatus || deletePostStatus

  return (
    <Form
      onSubmit={(values) => onSubmit(values, createPost, updatePost, deletePost, toast, router)}
      validate={validateForm}
      initialValues={post}
      render={({ handleSubmit, form, errors, submitting, values }) => (
        <Box
          as="form"
          p={4}
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          onSubmit={handleSubmit}
        >
          <InputControl name="title" label="Post title" />
          <TextareaControl name="body" label="Post description" />
          <SelectControl
            name="userId"
            label="Choose a user"
            options={users}
            valueKey="id"
            labelKey="name"
            isLoading={usersStatus === "loading"}
          />
          <ButtonGroup spacing={4}>
            <Button
              isLoading={submitting || status === "loading"}
              loadingText="Submitting"
              type="submit"
              onClick={() => {
                form.change("action", post ? "update" : "create")
              }}
            >
              {!post && "Create"}
              {post && "Update"}
            </Button>
            {post && (
              <Button
                isLoading={submitting || status === "loading"}
                loadingText="Submitting"
                type="submit"
                onClick={() => {
                  form.change("action", "delete")
                }}
              >
                Delete
              </Button>
            )}
          </ButtonGroup>
          <Box as="pre" my={10}>
            {JSON.stringify(values, null, 2)}
          </Box>
          <Box as="pre" my={10}>
            {JSON.stringify(errors, null, 2)}
          </Box>
        </Box>
      )}
    />
  )
}
