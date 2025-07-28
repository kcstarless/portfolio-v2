import { FormControl, Button, FormHelperText } from '@mui/material'

export const ImageUploadField = ({ value, onChange, error, disabled }) => (
  <FormControl error={!!error}>
    <input
      accept="image/*"
      type="file"
      id="upload-image"
      style={{ display: 'none' }}
      onChange={onChange}
      disabled={disabled}
    />
    <label htmlFor="upload-image">
      <Button variant="contained" component="span" disabled={disabled}>
        Upload Image
      </Button>
      {value && <span style={{ marginLeft: 8 }}>{value.name}</span>}
    </label>
    {error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
)
