import { useState } from 'react';
// import { Carousel } from 'react-responsive-carousel';
import ReactLoading from "react-loading";

import { api } from '../services/api';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { exportImages } from '../services/ExportImages';

import '../styles/home.scss';
import axios, { AxiosError } from 'axios';

type targetProps = {
  target: HTMLInputElement
}

type ServerError = { errorMessage: string };

// type responseProps = {
//   hit: Number,
//   region: String,
//   type: String,
//   return: { 
//     code: Number, 
//     message: String
//   }
// }

export function Home(){
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
	const [selectedFileOcr, setSelectedFileOcr] = useState<File | undefined>();
  const [tempImage, setTempImage] = useState('');
  const [tempImageOcr, setTempImageOcr] = useState('');
  const [infoJson, setInfoJson] = useState<any>('');
  const [infoJsonOcr, setInfoJsonOcr] = useState<Object>();
  const [showButton, setShowButton] = useState(false);
  const [showButtonOcr, setShowButtonOcr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOcr, setIsLoadingOcr] = useState(false);
  const images = exportImages();

  //Objeto para tradução das propriedades da API
  const translatedInfo = {
    probabilidade: '',
    documento: '',
  }

  const erro = {
    erro: 'A imagem não é um documento válido ou ainda não existe'
  }

  //Função que transforma o File em uma imagem base64
  function getBase64(file: File) {
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  //Arquivo da imagem em tipo File vindo de um estado
  const image = selectedFile;
  const imageOcr = selectedFileOcr;

  async function parseImage(){
    //Verificação para saber se o File é Undefined
    if(!image){
      return
    }
    // executa a função que transforma a imagem em Base64
    const apiImage = await getBase64(image)
    const newApiImage = await apiImage.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "")

    return { newApiImage, apiImage };
  }

  async function parseImageOcr(){
    //Verificação para saber se o File é Undefined
    if(!imageOcr){
      return
    }

    const apiImageOcr = await getBase64(imageOcr);
    const newApiImageOcr = await apiImageOcr.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "")

    return { apiImageOcr, newApiImageOcr }
  }
//função de post da imagem normal
  async function postImage(data: any){
    let response = '';
    const config = {
      headers : {
        'Ocp-Apim-Subscription-Key': 'a02ec92761234da5a25348d44f6bf4b0'
      }
    }
    try {
      //POST com axios
      const res = await api.post('/fxType?code=NixJacw2taGwZQcXF3R3cBGYYMLAkRwCvzan38YAi7OdHzFjKxZWig==', data, config)
      response = res.data;
    } catch (error) {
      setInfoJson(false);
      setIsLoading(false);
      setShowButton(!showButton);
      setTempImage('');
      if(axios.isAxiosError(error)){
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          console.log(serverError.response.data);
          return
        }
      } 
      console.log({ errorMessage: "Erro base" });
      return
    }
      return response;
  }

  async function postImageOcr(data: any){
    let response: any = '';
    const config = {
      headers : {
        'Ocp-Apim-Subscription-Key': 'a02ec92761234da5a25348d44f6bf4b0'
      }
    }
    try {
      //POST com axios
      const res = await api.post('/fxData?code=SyvXOJzEukI5z/naFFkaJTACu7gwyRJuHaPa5u/Chr5CRxa9RShXdw==', data, config)
      response = res.data;
    } catch (error) {
      setInfoJsonOcr(erro.erro);
      setIsLoadingOcr(false);
      setShowButtonOcr(!showButtonOcr);
      if(axios.isAxiosError(error)){
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          console.log(serverError.response.data);
          return
        }
      } 
      console.log({ errorMessage: "Erro base" });
      return
    }
      return response;
  }
  
  //Função de envio da imagem para API
  async function handleSendImage(){
    setIsLoading(true);

    const parsedImage = await parseImage();
    //Criando um JSON Data para enviar a imagem pelo Axios
    const data = JSON.stringify({
        "file_name": image?.name, 
        "image": parsedImage?.newApiImage
    });
    console.log(data);

    const response: any = await postImage(data);
    console.log(response)

    // Desestruturação do Objeto para usar somente duas propriedades com uma função que chama ela mesma 
    const pickedProps = (({ hit, type }) => {
      return { hit, type }
    })(response);
    console.log(pickedProps);

    //Tradução das propriedades da API
    translatedInfo.probabilidade = `${pickedProps.hit.toFixed(0)}%`;
    translatedInfo.documento = pickedProps.type.split("-", 1).toString();
    setInfoJson(translatedInfo);
    //Estado que controla o botão de enviar ou adicionar imagem
    setIsLoading(false);
    setShowButton(!showButton);
    //Estado que armazena a foto enviada em Base64 para possível uso pelo front
    setTempImage(parsedImage?.apiImage);
  }

  //Função de envio da imagem Ocr
  async function handleSendImageOcr(){
    setIsLoadingOcr(true);

    const parsedImage = await parseImageOcr();
    //Criando um JSON Data para enviar a imagem pelo Axios
    const data = JSON.stringify({
        "file_name": imageOcr?.name, 
        "image_type": "CNH-Full",
        "image": parsedImage?.newApiImageOcr
    });
    console.log(data);

    const response: any = await postImageOcr(data);
    console.log(response)

    // Desestruturação do Objeto para usar somente duas propriedades com uma função que chama ela mesma 
    // const pickedProps = (({ hit, type }) => {
    //   return { hit, type }
    // })(response.data);
    // console.log(pickedProps);

    setInfoJsonOcr(response.data);
    //Estado que controla o botão de enviar ou adicionar imagem
    setIsLoadingOcr(false);
    setShowButtonOcr(!showButtonOcr);
    //Estado que armazena a foto enviada em Base64 para possível uso pelo front
    setTempImageOcr(parsedImage?.apiImageOcr);
  }

  return(
    <div id="general">
      <aside>
        <img src={images[0]} alt="" />
      </aside>
      <main className="mainContent">
        <div className="mainContent-introduction">
          <div className="text">
            <h2>Tipificação de documentos</h2>
            <p>
              Insira a sua imagem e dentro de alguns segundos seu documento será validado!!
            </p>
          </div>
          <img src={images[1]} alt="Imagem de exemplo dos documentos brasileiros" />
        </div>

        {/* <div className="mainContent-carousel">
          <Carousel autoPlay={true} infiniteLoop={true}  width={600}>
            <div onClick={() => console.log('oi')}>
              <img  src={images[1]} alt="Imagem de exemplo dos documentos brasileiros" />
            </div>
            <div>
              <img src={images[2]} alt="Imagem de exemplo dos documentos brasileiros" />
            </div>
            <div>
              <img src={images[3]} alt="Imagem de exemplo dos documentos brasileiros" />
            </div>
            <div>
              <img src={images[4]} alt="Imagem de exemplo dos documentos brasileiros" />
            </div>
          </Carousel>
        </div> */}

        <div className="mainContent-uploadImage">
          <h3>Teste com seus arquivos</h3>
          {/* O Ternário mostra na tela Adicionar arquivos OU enviar OU o loading dependendo da condição */}
          {showButton === false ?  
            <label htmlFor="files" className="mainContent-uploadImage_content">
              <img src={images[7]} alt="Ícone de Upload" />
              <h3>Clique aqui para adicionar os arquivos</h3>
              <input id='files' accept=".png, .jpg, .jpeg" type='file' onChange={(event: targetProps) => {
                if(event.target.files){
                  console.log('Peguei a imagem')
                  setSelectedFile(event.target.files[0]);
                  setShowButton(!showButton);
                }
              }}/>
            </label>   
          :
          isLoading ? 
              <label htmlFor="files" className="mainContent-uploadImage_content">
                <ReactLoading type={'spin'} color="#FF8B63"/>
              </label> 
              :
          <label htmlFor="files" className="mainContent-uploadImage_content">
            <button id='files' onClick={handleSendImage}>Enviar Imagem</button>
          </label> 
          }
        </div>

        <div className="mainContent-showData">
          <div className="showData-doc">
            <h3>Documento</h3>
            <div className="showData-docImage">
              <img src={tempImage} alt="imagem do documento" />
            </div>
          </div>
          <div className="showData-info">
            <h3>Tipificação</h3>
            <div className="showData-infoJSON">
              { infoJson === '' ? 
                <p></p>
                :
                infoJson ? 
                <p>{`Documento: ${infoJson.documento}`}<br/>{`Probabilidade de Acerto: ${infoJson.probabilidade}`}</p>
                :
                <p>{erro.erro}</p>
              }
            </div>
          </div>
        </div>
        <hr />
{/* =================================================================================================== */}

        <div className="mainContent-ocr">
          <h2>Extração de dados</h2>
          <img src={images[8]} alt="Imagem de explicação OCR" />
        </div>

        <div className="mainContent-uploadImage">
          <h3>Teste com seus arquivos</h3>
          <div className="mainContent-uploadImage-radio">
            <p>Escolha o tipo de documento antes de enviar uma imagem:</p>
            <div className="radio-item">
              <input type="checkbox" id="rg" name="drone" value="rg" checked/>
              <label htmlFor="rg">RG</label>
            </div>
            <div className="radio-item">
              <input type="radio" id="cnh" name="drone" value="cnh"/>
              <label htmlFor="cnh">CNH</label>
            </div>
          </div>
          
          {/* O Ternário mostra na tela Adicionar arquivos OU enviar OU o loading dependendo da condição */}
          {showButtonOcr === false ?  
            <label htmlFor="filesOcr" className="mainContent-uploadImage_content">
              <img src={images[7]} alt="Ícone de Upload" />
              <h3>Clique ou arraste os arquivos aqui</h3>
              <input id='filesOcr' accept=".png, .jpg, .jpeg" type='file' onChange={(event: targetProps) => {
                if(event.target.files){
                  console.log('Peguei a imagem 2')
                  setSelectedFileOcr(event.target.files[0]);
                  setShowButtonOcr(!showButtonOcr);
                }
              }}/>
            </label>   
          :
          isLoadingOcr ? 
              <label htmlFor="files" className="mainContent-uploadImage_content">
                <ReactLoading type={'spin'} color="#FF8B63"/>
              </label> 
              :
          <label htmlFor="files" className="mainContent-uploadImage_content">
            <button id='files' onClick={handleSendImageOcr}>Enviar Imagem</button>
          </label> 
          }
        </div>

        <div className="mainContent-showData">
          <div className="showData-doc">
            <h3>Documento</h3>
            <div className="showData-docImage">
              <img src={tempImageOcr} alt="imagem do documento" />
            </div>
          </div>
          <div className="showData-info">
            <h3>Dados</h3>
            <div className="showData-infoJSON">
              <pre>{JSON.stringify(infoJsonOcr, null, 2)}</pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}