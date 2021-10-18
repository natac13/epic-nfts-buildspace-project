import { Box, CircularProgress, Container, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import * as React from 'react'

// Client-side cache, shared for the whole session of the user in the browser.

export default function Index() {
  const [currentAccount, setCurrentAccount] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  // const onChange = (str: string): void => {
  //   setError('')
  //   setMessage(str)
  // }

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

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
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
        {!currentAccount && (
          <Button
            color="primary"
            variant="outlined"
            onClick={connectWallet}
            disabled={loading}
          >
            Connect Wallet
          </Button>
        )}
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
