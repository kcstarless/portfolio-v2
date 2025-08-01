import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchProjects } from "../store/projectSlice"
import { fetchTechs } from "../store/techSlice"
import { preloadImages } from "../utils/loadImages"

export const useAppLoader = () => {
  const [step, setStep] = useState("s1")
  const dispatch = useDispatch()
  
  useEffect(() => {
    const load = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000))  
        //// Step 1: Ping server
        await axios.get("/api/init/ping")
        setStep("s2")
        await new Promise((res) => setTimeout(res, 1000))  

        //// Step2: Fetch projects
        setStep("s3")
        const projects = await dispatch(fetchProjects()).unwrap()
        await dispatch(fetchTechs()).unwrap()
        await new Promise((res) => setTimeout(res, 1000))  
        
        //// Step3: Preload images
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
};
