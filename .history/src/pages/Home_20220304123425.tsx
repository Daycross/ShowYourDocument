import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import api from '../services/api';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { exportImages } from '../services/ExportImages';

import '../styles/home.scss';

type targetProps = {
  target: HTMLInputElement
}

export function Home(){
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const images = exportImages();

	// 	setSelectedFile(event.target.value);
	// 	setIsFilePicked(true);

	// };
  
  async function handleSendImage(){

    let data = new FormData();
    const image:any = selectedFile;

    data.append('file', image, selectedFile?.name);
  
    const config = {
      headers : {
        'Content-Type' : 'multipart/form-data'
      }
    }

    const response = await api.post('/', selectedFile, config)
    console.log(response);
  }

  return(
    <div id="general">
      <aside>
        <img src={images[0]} alt="" />
      </aside>
      <main className="mainContent">
        <div className="mainContent-introduction">
          <div className="text">
            <h2>Tipificação e Extração de dados</h2>
            <p>
              Escolha uma das imagens exemplo abaixo ou envie seus próprios 
              arquivos. Dentro de alguns segundos você terá seu documento ajustado, 
              tipificado e com todas as informações extraídas.
            </p>
            <p> Teste agora :) </p>
          </div>
          <img src={images[1]} alt="Imagem de exemplo dos documentos brasileiros" />
        </div>

        <div className="mainContent-carousel">
        <Carousel autoPlay={true} infiniteLoop={true}>
            <div>
              <img src={images[1]} alt="Imagem de exemplo dos documentos brasileiros" />
            </div>
            <div>
              <img src={images[1]} alt="Imagem de exemplo dos documentos brasileiros" />
            </div>
            <div>
              <img src={images[1]} alt="Imagem de exemplo dos documentos brasileiros" />
            </div>
            <div>
              <img src={images[1]} alt="Imagem de exemplo dos documentos brasileiros" />
            </div>
          </Carousel>
        </div>

        <div className="mainContent-showData">
          <div className="showData-doc">
            <h3>Documento</h3>
            <img src="#" alt="imagem do documento" />
          </div>
          <div className="showData-info">
            <h3>Dados</h3>
            <div className="showData-infoJSON">
              <p>Dados Aqui</p>
            </div>
          </div>
        </div>

        <div className="mainContent-uploadImage">
          <h3>Teste com seus arquivos</h3>
            <label htmlFor="files" className="mainContent-uploadImage_content">
              <img src={images[7]} alt="Ícone de Upload" />
              <h3>Clique ou arraste os arquivos aqui</h3>
              <input id='files' accept=".png, .jpg, .jpeg" type='file' onChange={(event: targetProps) => {
                if(event.target.files){
                  console.log('Peguei a imagem')
                  setSelectedFile(event.target.files[0]);
                }
              }}/>
            </label>          
        </div>
      </main>
      <button onClick={handleSendImage}></button>
    </div>
  );
}