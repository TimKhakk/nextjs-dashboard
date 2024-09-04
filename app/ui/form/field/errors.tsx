export const FormFieldError = ({ errors }: { errors: string[] | undefined }) => {
  return errors?.map((error: string) => (
    <p className="mt-2 text-sm text-red-500" key={error}>
      {error}
    </p>
  ))
}
