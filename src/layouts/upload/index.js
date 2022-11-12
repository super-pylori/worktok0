/* eslint-disable */

import { useState } from "react";

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

function Upload() {
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

  const sasToken = "sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-11-18T16:09:14Z&st=2022-11-12T08:09:14Z&spr=https&sig=Q0gv1HwS%2B3NVU7TvO0Fh9nsRelfObrvvf8j6rCzvF7M%3D";
  const storageAccountName = "stworktok001";
  const containerName = "cworktok001";
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
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">FileUpload</MDTypography>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <input name="file" type="file" onChange={onFileChange} accept="image/*" />
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="success" onClick={CreateBlob} fullWidth>
                      Upload
                    </MDButton>
                    {renderSuccessSB}
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Upload;
