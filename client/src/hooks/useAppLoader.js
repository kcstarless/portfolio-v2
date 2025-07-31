import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../store/projectSlice"
import { fetchTechs } from "../store/techSlice";
import { preloadImages } from "../utils/loadImages"

export const useAppLoader = () => {
  const [step, setStep] = useState("s1")
  const dispatch = useDispatch()
  useEffect(() => {
    const load = async () => {
      try {
        // Step 1: Ping server
        await new Promise((res) => setTimeout(res, 1000))  
        await axios.get("/api/init/ping")
        setStep("s2")
        await new Promise((res) => setTimeout(res, 1000)) 
        
        //// Step2: Fetch projects
        setStep("s3")
        await dispatch(fetchProjects()).unwrap()
        await dispatch(fetchTechs()).unwrap()
        await new Promise((res) => setTimeout(res, 1000))
        
        //// Step3: Preload images
        setStep("s4")
        await new Promise((res) => setTimeout(res, 1000))
        // const imageUrls = projects.map((p) => p.imagePath).filter(Boolean);
        // await preloadImages(imageUrls, (i, url, status) => {
        //   console.log(`Image [${i + 1}/${imageUrls.length}] ${status}:`, url);
        // });

        // // Step 2: Fetch initial data
        // setStep("fetching_data")
        // const response = await axios.get("/api/init")
        // const data = response.data
        // console.log("Initial data:", data)
        // setStep("data_loaded")

        // // Step 3: Wait for frontend readiness
        // setStep("frontend_loading")

        await new Promise((res) => setTimeout(res, 1000))

        setStep("ready")
      } catch (e) {
        console.error("App loading failed:", e)
        setStep("error");
      }
    };

    load();
  }, []);

  return step;
};
