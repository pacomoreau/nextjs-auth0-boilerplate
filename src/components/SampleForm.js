import { Form } from "react-final-form"
import { InputControl, SelectControl, TextareaControl } from "@/components/form-fields"
import { Box, Button, ButtonGroup } from "@chakra-ui/react"

const onSubmit = async (values) => {
  console.log("submit", values)
}

export const SampleForm = () => {
  return (
    <Form
      onSubmit={onSubmit}
      //validate={validate}
      render={({ handleSubmit, form, errors, submitting, pristine, values }) => (
        <Box
          as="form"
          p={4}
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          onSubmit={handleSubmit}
        >
          {/* 
            This example uses a mixture of custom field components using useField() 
            and components adapted to take the { input, meta } structure <Field/>
            provides
            */}
          <InputControl name="firstName" label="First Name" />
          <InputControl name="lastName" label="Last Name" />
          <TextareaControl name="notes" label="Notes" />
          <SelectControl
            name="colors"
            label="Choose a color"
            options={[
              { label: "Red", value: "red" },
              { label: "Green", value: "green" },
              { label: "Blue", value: "blue" },
            ]}
          />
          <ButtonGroup spacing={4}>
            <Button isLoading={submitting} loadingText="Submitting" type="submit">
              Submit
            </Button>
            <Button variant="outline" onClick={form.reset} isDisabled={submitting || pristine}>
              Reset
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
