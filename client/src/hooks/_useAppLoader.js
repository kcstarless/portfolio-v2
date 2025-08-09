import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import * as stores from 'stores'
import * as utils from "utils"
// import { useLocalInfo } from "./useLocalInfo"

export const useAppLoader = () => {
  const [step, setStep] = useState("s1")
  const dispatch = useDispatch()

  // const { isLoaded: localInfoLoaded } = useLocalInfo()

  useEffect(() => {
    const load = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000))  
        await axios.get("/api/init/ping")
        setStep("s2")
        await new Promise((res) => setTimeout(res, 1000))  

        // setStep("s2a")
        // while (!localInfoLoaded) {
        //   await new Promise((res) => setTimeout(res, 1000))
        // }

        setStep("s3")
        const projects = await dispatch(stores.fetchProjects()).unwrap()
        await dispatch(stores.fetchAllProjects()).unwrap()
        await dispatch(stores.fetchTechs()).unwrap()
        await new Promise((res) => setTimeout(res, 1000))  

        setStep("s4")
        const imageUrls = projects.map((p) => p.imagePath).filter(Boolean)
        await utils.preloadImages(imageUrls, (i, url, status) => {
          console.log(`Image [${i + 1}/${imageUrls.length}] ${status}:`, url)
        })
        setStep("ready")
      } catch (e) {
        console.error("App loading failed:", e)
        setStep("error")
      }
    };

    load()
  }, [])

  return step;
}
