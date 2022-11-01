import {useEffect, useState} from "react";

export function useClock(init) {
    const [time, setTime] = useState(init)
    let a = init

    useEffect(() => {
        
        sessionStorage.setItem('z', String(time))
    }, [time])

    return [time]
}