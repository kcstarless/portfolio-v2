// components/tech/TechForm.jsx
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  styled,
} from '@mui/material'
import { useNotification } from '../../contexts/NotificationContext'
import { GetIcon } from '../Icon'
import { IconResultBox } from './IconResultBox'
import { CurrentTechStack } from './CurrentTechStack'
import { useTechForm } from '../../hooks/useTechForm'
import { useSelector } from 'react-redux'
import * as UT from '../../utils/techUtils'

const TechForm = () => {
  const { showFormNotification } = useNotification()
  const loading = useSelector(state => state.techs.loading)

  const {
    formData,
    iconResults,
    techs,
    handleChange,
    selectIcon,
    handleSubmit,
    editingTech,
    handleEdit,
    handleDelete,
  } = useTechForm(showFormNotification)

  const TechFormButtons = ({ isEditing, onDelete }) => (
    !isEditing ? (
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        Add New Tech
      </Button>
    ) : (
      <>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Update
        </Button>
        <Button type="button" variant="contained" color="error" onClick={onDelete} disabled={loading}>
          Delete
        </Button>
      </>
    )
  )
  const LevelSelector = ({ level, onChange }) => (
    <SelectInput disabled={loading} >
      <InputLabel id="tech-level-label">Level</InputLabel>
      <Select
        labelId="tech-level-label"
        value={level}
        label="Level"
        onChange={onChange}
      >
        {UT.levels.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </SelectInput>
  )

  return (
    <FormBox component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <InputRow>
        <SearchInput
          label="Technology Stack Search"
          value={formData.name}
          onChange={handleChange('name')}
          disabled={formData.id} // cannot change name
        />
        <LevelSelector level={formData.level} onChange={handleChange('level')} />

        <TechFormButtons isEditing={!!formData.id} onDelete={handleDelete} />

      </InputRow>

      <CommentsInput
        label="Comments"
        value={formData.comments}
        onChange={handleChange('comments')}
        disabled={loading} 
      />

      <IconResultBox
        iconResults={iconResults}
        selectedIcon={formData.icon}
        selectIcon={selectIcon}
      />

      <TitleRow variant="h4">
        <GetIcon type="addTech" /> &nbsp; My Current Stack
        <FadedText fontSize={12}>
          {editingTech ? 'unselect to go back.' : 'Select tech to update/delete.'}
        </FadedText>
      </TitleRow>

      <CurrentTechStack
        techs={techs}
        handleEdit={handleEdit}
        editingTech={editingTech}
        disabled={loading}
      />
    </FormBox>
  )
}

export { TechForm }


// Styled Components
const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  margin: theme.spacing(1),
}))

const InputRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}))

const SearchInput = styled(TextField)({
  flex: 2,
})

const CommentsInput = styled(TextField)({
  flex: 1,
})

const SelectInput = styled(FormControl)({
  flex: 1,
})

const FadedText = styled(Typography)({
  opacity: 0.7,
  alignSelf: 'center',
})

const TitleRow = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  width: '100%',
}))