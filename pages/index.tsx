import {
  Box,
  CircularProgress,
  Container,
  Grow,
  Typography,
} from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'
import { ethers } from 'ethers'
import myEpicNft from '../src/utils/MyEpicNFT.json'

// Constants
const TWITTER_HANDLE = '_buildspace'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`
const OPENSEA_LINK = ''
const TOTAL_MINT_COUNT = 50
const CONTRACT_ADDRESS = '0x977e6b65B2E2Bb8fD13F2423163c15Fb67b3F5C6'

export default function Index() {
  const [currentAccount, setCurrentAccount] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  // const onChange = (str: string): void => {
  //   setError('')
  //   setMessage(str)
  // }
  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        )

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on('NewEpicNFTMinted', (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(
            `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          )
        })

        console.log('Setup event listener!')
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Make sure you have metamask!')
        return
      } else {
        console.log('We have the ethereum object', ethereum)
      }

      /*
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account:', account)
        setCurrentAccount(account)

        setupEventListener()
      } else {
        console.log('No authorized account found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }
      console.log('heelo')

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])

      setupEventListener()
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window
      console.log('??')

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        )

        console.log('Going to pop wallet now to pay gas...')
        const nftTxn = await connectedContract.makeAnEpicNFT()

        console.log('Mining...please wait.')
        await nftTxn.wait()

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        )
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createOpenSeaLink = (
    contractAddress: string,
    tokenId: string
  ): string => {
    return `https://testnet.opensea.io/assets/${contractAddress}/${tokenId}`
  }

  const createRaribleLink = (
    contractAddress: string,
    tokenId: string
  ): string => {
    return `https://rinkeby.rarible.com/token/${contractAddress}/${tokenId}`
  }

  React.useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <Container maxWidth="md">
      <Box
        component="header"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'column',
          my: 2,
        }}
      >
        <Typography variant="h1" align="center" fontWeight="700">
          Epic NFTs
        </Typography>
        {currentAccount && (
          <>
            <Typography variant="h6">Account</Typography>
            <Typography variant="subtitle1">{currentAccount}</Typography>
          </>
        )}
      </Box>
      <Box
        sx={{
          my: 3,
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          flexFlow: 'column',
          gap: 2,
        }}
      >
        <Grow in={!!currentAccount}>
          <Button
            variant="contained"
            color="secondary"
            onClick={askContractToMintNft}
          >
            Mint NFT
          </Button>
        </Grow>
        <Grow in={!currentAccount}>
          <Button
            color="primary"
            variant="outlined"
            onClick={connectWallet}
            disabled={loading}
          >
            Connect Wallet
          </Button>
        </Grow>
      </Box>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="subtitle1" align="center">
            Pending Transaction
          </Typography>
          <CircularProgress color="secondary" size={50} />
        </Box>
      )}
      {/* <Box>
        {allWaves?.map((wave, idx) => (
          <Card key={idx} sx={{ mb: 2 }}>
            <CardHeader title={wave?.address} />
            <CardContent>
              <Typography>Time: {wave?.timestamp.toString()}</Typography>
              <Typography>Message: {wave?.message}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box> */}
    </Container>
  )
}
