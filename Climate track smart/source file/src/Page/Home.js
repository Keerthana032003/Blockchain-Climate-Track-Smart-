import React, { useState } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { contract } from "./connector";
import { signer } from "./connector";
import { provider } from "./connector";

function Home() {
   const [Id, setId] = useState("");
   const [ClimateDet, setClimateDet] = useState("");
   const [UpdateClimateDetails, setUpdateClimateDetails] = useState("");
   

   const [TranId, setTranId] = useState("");
   const [Owner, setOwner] = useState("");
   const [BookId, setBookId] = useState("");
   const [BookDet, setBookDet] = useState("");
   const [Wallet, setWallet] = useState("");

 
   const handleId = (e) => {
      setId(e.target.value)
   } 

   const handleClimateDetails = (e) => {
      setClimateDet(e.target.value)
   } 

   

   const handleClimate = async () => {
      try {
         let tx = await contract.addClimateData(ClimateDet)
         let wait = await tx.wait()
         alert(wait.transactionHash)
         console.log(wait);
      } catch (error) {
         alert(error)
      }
   }

   const handleDrugId = (e) => {
      setTranId(e.target.value)
   }

   const handleUpdatedClimateDetails = (e) => {
      setUpdateClimateDetails(e.target.value)
   } 

   const handleUpdateClimate = async () => {
      try {
         let tx = await contract.updateClimateData(UpdateClimateDetails)
         let wait = await tx.wait()
         console.log(wait);
         alert(wait.transactionHash)
      } catch (error) {
         alert(error)   
      }
   }

   const handleTollDetailsId = (e) => {
      setBookId(e.target.value)
   }

   const handleGetClimateDetails = async () => {
      try {
         let tx = await contract.getClimateData()
         let arr = []
         tx.map(e => {
            arr.push(e)
         })
         
         console.log(tx);
         setBookDet(arr)
      } catch (error) {
         alert(error)
         console.log(error);
      }
   }

   const handleWallet = async () => {
      if (!window.ethereum) {
         return alert('please install metamask');
      }

      const addr = await window.ethereum.request({
         method: 'eth_requestAccounts',
      });

      setWallet(addr[0])

   }

 return (
  <div>
   <h1 style={{ marginTop: "30px", marginBottom: "80px" }}>Climate Change</h1>
       {!Wallet ?

          <Button onClick={handleWallet} style={{ marginTop: "30px", marginBottom: "50px" }}>Connect Wallet </Button>
          :
          <p style={{ width: "250px", height: "50px", margin: "auto", marginBottom: "50px", border: '2px solid #2096f3' }}>{Wallet.slice(0, 6)}....{Wallet.slice(-6)}</p>
       }
   <Container>
    <Row>
     <Col style={{marginRight:"100px"}}>
      <div>

      
         {/* <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleClimateDetails} type="textArea" placeholder="Enter climate details" value={ClimateDet} /> <br /> */}
                   <textarea rows="4" cols="30" name="comment" placeholder="Enter climate Details" onChange={handleClimateDetails} value={ClimateDet}></textarea>
         <Button onClick={handleClimate} style={{ marginTop: "10px" }} variant="primary"> Add Climate Data</Button>
      </div>
     </Col>
      <Col>
         <div>
                   <textarea rows="4" cols="30" name="comment" placeholder="Update existing climate Details" onChange={handleUpdatedClimateDetails} value={UpdateClimateDetails}></textarea>
                   <Button onClick={handleUpdateClimate} style={{ marginTop: "10px" }} variant="primary"> Update Climate Data</Button>

         </div>
      </Col>          
   </Row>   
   <Row>
       <Col>
           <div style={{ margin: "auto", marginTop:"100px" }}>
            {/* <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleTollDetailsId} type="number" placeholder="Enter Highway Id" value={BookId} /><br /> */}
                <Button onClick={handleGetClimateDetails} style={{ marginTop: "10px" }} variant="primary">Get Climate Data</Button>
                   {BookDet ? BookDet?.map(e => {
                      return <p>{e.toString()}</p>
                   }) : <p></p>}
            </div>
         </Col> 
   </Row> 
   </Container>

  </div>
 )
}

export default Home;
