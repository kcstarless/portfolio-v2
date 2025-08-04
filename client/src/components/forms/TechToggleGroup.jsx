import { FormControl, ToggleButtonGroup, ToggleButton, Tooltip, FormHelperText } from '@mui/material'
import { GetTechIcon } from '../Icon'

export const TechToggleGroup = ({ techs, value, onChange, error, disabled, project }) => (
  <FormControl error={!!error}>
    <ToggleButtonGroup
      value={value}
      onChange={onChange}
      aria-label="tech stack"
      sx={{ flexWrap: 'wrap', gap: 1, mt: 2 }}
      disabled={disabled}
    >
      {techs.map((tech) => (
          <ToggleButton key={tech.id} value={tech.id} aria-label={tech.name}>
            <GetTechIcon className={tech.icon} size={30} />
          </ToggleButton>
      ))}
    </ToggleButtonGroup>
    {error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
)
