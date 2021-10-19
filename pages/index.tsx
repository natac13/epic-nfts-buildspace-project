import {
  Box,
  CircularProgress,
  Container,
  Grow,
  Link,
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
const CONTRACT_ADDRESS = '0x75d580a45E4ed33f7c034e2284659680e6019Ef5'

const createOpenSeaLink = (
  contractAddress: string,
  tokenId: string
): string => {
  return `https://testnets.opensea.io/assets/${contractAddress}/${tokenId}`
}

const createRaribleLink = (
  contractAddress: string,
  tokenId: string
): string => {
  return `https://rinkeby.rarible.com/token/${contractAddress}/${tokenId}`
}

export default function Index() {
  const [currentAccount, setCurrentAccount] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  const [lastMintedUrl, setLastMintedUrl] = React.useState('')

  const checkCorrectBlockchain = async () => {
    const { ethereum } = window
    if (ethereum) {
      const chainId = await ethereum.request({ method: 'eth_chainId' })
      console.log('Connected to chain ' + chainId)

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = '0x4'
      if (chainId !== rinkebyChainId) {
        alert('You are not connected to the Rinkeby Test Network!')
      }
    }
    return true
  }
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
          setLastMintedUrl(createOpenSeaLink(CONTRACT_ADDRESS, tokenId))
          // alert(
          //   `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          // )
          setCounter((state) => 1 + tokenId?.toNumber())
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
        setLoading(true)

        console.log('Mining...please wait.')
        await nftTxn.wait()
        setLoading(false)

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

  const getMinedCount = async () => {
    const { ethereum } = window

    if (!ethereum) return

    try {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const singer = provider.getSigner()
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicNft.abi,
        singer
      )
      const minedCount = await contract.getTotalNFTsMined()
      setCounter(minedCount?.toNumber())
      setLastMintedUrl(
        createOpenSeaLink(CONTRACT_ADDRESS, minedCount?.toNumber() - 1)
      )
    } catch (error) {
      console.log({ error })
    }
  }

  React.useEffect(() => {
    checkCorrectBlockchain()
      ?.then(checkIfWalletIsConnected)
      ?.then(getMinedCount)
    // getMinedCount()
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
        <Typography variant="h5" align="center" fontWeight="700">
          Total Mined: {counter}
        </Typography>
        {lastMintedUrl && (
          <Typography variant="h5" align="center" fontWeight="700">
            Last Minted NFT: <Link href={lastMintedUrl}>Here</Link>
          </Typography>
        )}
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
          <Box display="flex" flexDirection="column" gap={3}>
            <Button variant="contained" color="primary" onClick={getMinedCount}>
              Get Mined NFT Count
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={askContractToMintNft}
            >
              Mint NFT
            </Button>
          </Box>
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
