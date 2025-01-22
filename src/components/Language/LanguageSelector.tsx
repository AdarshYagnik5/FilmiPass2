import { Box, Button } from "@mui/material"
import { useTranslation } from "react-i18next"

const languages = [
    {code: 'en', name: 'English'},
    {code: 'fr', name: 'French'},
    {code: 'hi', name: 'Hindi'},
]
const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng:string) => {
        i18n.changeLanguage(lng);
        console.log('Language changed')
    }

    return <Box > {languages.map((lng)=>{
        return <Button className={lng.code === i18n.language ? 'selected' : ""} sx={{color:'white'}} key={lng.code} onClick={()=>changeLanguage(lng.code)}>{lng.name}</Button>
    })}</Box>
}
export default LanguageSelector