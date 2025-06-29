import { useRef } from "react";

export const useToast = () => {
    const toast = useRef(null);
    const showToast = (severity:string, summary:string, detail:any, life = 3000) => {
      toast.current?.show({ severity, summary, detail, life });
    };
    return { toast, showToast };
  };