/* eslint-disable */

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// blob
import { BlobServiceClient } from '@azure/storage-blob';

// uuid
import { v4 as uuidv4 } from 'uuid';

// reactのライブラリから、useStateをimport
import { useState,useEffect } from 'react';

import axios from 'axios';

function Watch() {
  const [analysis, setAnalysis] = useState();

  const sasToken = "sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-11-19T08:52:37Z&st=2022-11-13T00:52:37Z&spr=https&sig=oPDEw67hrBKlxQqzPxz2cv3erpQRafRpGoBpIFtmMGg%3D";
  const storageAccountName = "stworktokvideo";
  const containerName = "coworktokvideo";
  const URL = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

  const getAnalysis = () =>(
    axios.get('https://func-worktok.azurewebsites.net/api/getAnalysis?name=yoshiki')
    .then(res => {
      // setPosts(res.data)
      setAnalysis(res.data.name);
    })
  )

  useEffect(() => {
    getAnalysis();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <MDBox mb={1.5}>
              {analysis}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Watch;
