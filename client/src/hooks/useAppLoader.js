import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchProjects } from "../store/projectSlice"
import { fetchTechs } from "../store/techSlice"
import { preloadImages } from "../utils/loadImages"
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
        const projects = await dispatch(fetchProjects()).unwrap()
        await dispatch(fetchTechs()).unwrap()
        await new Promise((res) => setTimeout(res, 1000))  

        setStep("s4")
        const imageUrls = projects.map((p) => p.imagePath).filter(Boolean)
        await preloadImages(imageUrls, (i, url, status) => {
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
