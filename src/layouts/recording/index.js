/* eslint-disable */

import { useEffect, useRef, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// blob
import { BlobServiceClient } from '@azure/storage-blob';

// uuid
import { v4 as uuidv4 } from 'uuid';

// 撮影
import { useReactMediaRecorder } from 'react-media-recorder';
import Webcam from 'react-webcam';

const videoConstraints = { facingMode: 'user' }
const w = 300, h = 300

function Recording() {
  const videoRef = useRef(null);
  const webcamRef = useRef(null)
  const [recordingState, setRecordingState] = useState('idle')

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
  } = useReactMediaRecorder({ video: true });

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream])
  
  const [successSB, setSuccessSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const sasToken = "sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-11-18T15:29:53Z&st=2022-10-30T07:29:53Z&spr=https&sig=E13PMH7rCPHfJYeJ2jRkRao4eFqtrVTPXkikuIqlPl8%3D";
  const storageAccountName = "stotageaccount0";
  const containerName = "newcontainer";
  const URL = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState();

  const onFileChange = (e) => {
    // capture file into state
    setFileSelected(e.target.files[0]);
  };

  const CreateBlob = async () => {
    const blobServiceClient = new BlobServiceClient(URL);
    const containerClient = blobServiceClient.getContainerClient(containerName);
  
    const blobName = uuidv4();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.uploadData(fileSelected);
    console.log(`Upload block blob ${blobName} successfully`);
    setSuccessSB(true);;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <div className="App">
                  <header className="App-header">
                    <div>
                      <p>{status}</p>
                      {
                        recordingState !== 'recording'
                          ? recordingState === 'idle'
                            ? <button onClick={() => { startRecording(); setRecordingState('recording'); }}>Start Recording</button>
                            : <button onClick={() => { setRecordingState('idle') }}>reshoot</button>
                          : <button onClick={() => { stopRecording(); setRecordingState('recorded'); }}>Stop Recording</button>
                      }
                      <br />
                      {
                        // idle状態はreact-media-recorderのプレビュー画面が表示されないため、WebCamという別ライブラリを使用した。
                        recordingState === 'idle' &&
                        < Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints} width={w} height={h} />
                      }
                      {
                        // 録画中はWebCamが動作しなくなるため、react-media-recorderのプレビューを動作させる
                        (recordingState === 'recording' && previewStream) &&
                        // playsInlineがないと、録画中の画面プレビューが自動で再生されない
                        <video ref={videoRef} width={w} height={h} controls playsInline autoPlay />
                      }
                      {
                        // 録画完了後は、録画したものを表示する
                        recordingState === 'recorded' &&
                        <video src={mediaBlobUrl} controls autoPlay playsInline width={w} height={h} />
                      }
                    </div>
                  </header >
                </div >
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Recording;
