import techServices from '../services/tech'
import { useEffect, useState } from 'react'

const useTech = () => {
    const [techs, setTechs] = useState([])

    useEffect(() => {
        techServices.getAll().then(res => {
            setTechs(res)
        })
    }, [])

    return { techs }
}

export default useTech