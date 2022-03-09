import foxFlyLogo from '../assets/images/foxFly-logo.png'
import headerDoc from '../assets/images/headerDoc.png'
import cpfImage from '../assets/images/cpfImage.png'
import rgImage from '../assets/images/rgImage.png'
import rgSecondaryImage from '../assets/images/rgSecondaryImage.png'
import leftArrow from '../assets/images/leftArrow.svg'
import rightArrow from '../assets/images/rightArrow.svg'
import uploadIcon from '../assets/images/uploadIcon.svg'

export function exportImages(){
  const imagesArray = {

    logo: foxFlyLogo, 
    headerImage: headerDoc, 
    cpf: cpfImage, 
    rg: rgImage, 
    rg2: rgSecondaryImage, 
    leftArrow, 
    rightArrow, 
    upload: uploadIcon
  
  }

  return imagesArray;
}