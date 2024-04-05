import {useEffect, useRef} from "react";

export const useObserver = (ref, isLoading, callback) => {
    const observer = useRef();

    useEffect(() => {
        console.log(isLoading)
        if(!isLoading) {
            if(observer.current) {
                observer.current.disconnect();
            }
                    
            var cb = function(entries, observer) {
                console.log(entries[0].isIntersecting)
                if (entries[0].isIntersecting) {
                    callback()
                }
            };
            observer.current = new IntersectionObserver(cb);
            observer.current.observe(ref.current)
        }
    }, [isLoading])
}