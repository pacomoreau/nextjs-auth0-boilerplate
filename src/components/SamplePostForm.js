import { Form } from "react-final-form"
import { InputControl, SelectControl, TextareaControl } from "@/components/form-fields"
import { Box, Button, ButtonGroup } from "@chakra-ui/react"
import { useUsers } from "@/hooks/useUsers"

const onSubmit = (values, mode) => {
  console.log(mode, values)
}

const validateForm = (values) => {
  const errors = {}

  if (!values.title) {
    errors.title = "Post title required."
  }
  if (!values.userId || values.userId.length === 0) {
    errors.userId = "User required."
  }

  return errors
}

export const SamplePostForm = ({ mode = "create" }) => {
  const { data: users, status: usersStatus } = useUsers()

  return (
    <Form
      onSubmit={(values) => onSubmit(values, mode)}
      validate={validateForm}
      render={({ handleSubmit, errors, submitting, values }) => (
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
            <Button isLoading={submitting} loadingText="Submitting" type="submit">
              Submit
            </Button>
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
