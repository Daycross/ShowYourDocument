import foxFlyLogo from '../assets/images/foxFly-logo.png'
import headerDoc from '../assets/images/headerDoc.png'
import cpfImage from '../assets/images/cpfImage.png'
import rgImage from '../assets/images/rgImage.png'
import rgSecondaryImage from '../assets/images/rgSecondaryImage.png'
import leftArrow from '../assets/images/leftArrow.svg'
import rightArrow from '../assets/images/rightArrow.svg'
import uploadIcon from '../assets/images/uploadIcon.svg'

type imageProps = {
  logo: string, 
    headerImage: string, 
    cpf: string, 
    rg: string, 
    rg2: string, 
    leftArrow: string, 
    rightArrow: string, 
    upload: string
}

export function exportImages(){
  const imagesObj = {
    logo: foxFlyLogo, 
    headerImage: headerDoc, 
    cpf: cpfImage, 
    rg: rgImage, 
    rg2: rgSecondaryImage, 
    leftArrow, 
    rightArrow, 
    upload: uploadIcon
  }

  return imagesObj;
}