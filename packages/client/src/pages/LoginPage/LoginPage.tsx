import {
  Button,
  Heading,
  Paragraph,
} from 'grommet';
import {
  getAccounts,
  personalSign,
} from '../../services/AuthService';
import { useWeb3Context } from '../../contexts/Web3Context/Web3Context';

const LoginPage: React.FC = () => {
  const web3Context = useWeb3Context();

  const handleClick = async () => {
    if (web3Context?.account) {
      const signature =
        await web3Context.getSignature();
      console.log(signature);
    }
  };

  return (
    <>
      <Heading>Login here</Heading>
      <Paragraph>
        Is connected?:{' '}
        {web3Context.isLoggedIn() ? 'Yes' : 'No'}
      </Paragraph>
      <Paragraph>
        Connected account:{' '}
        {web3Context.account ?? 'Not connected'}
      </Paragraph>
      <Button onClick={web3Context.loadAccount}>
        Load account
      </Button>
      <Button onClick={handleClick}>
        Connect account
      </Button>
    </>
  );
};

export default LoginPage;
