import { Page, PageContent, Heading, Box } from 'grommet';

type PageContainerProps = {
  children?: React.ReactNode;
  title: string;
};

const PageContainer: React.FC<PageContainerProps> = ({ children, title }) => (
  <Page kind="narrow">
    <PageContent background="light-2" pad="medium">
      <Box direction="column" gap="medium">
        <Heading alignSelf="center">{title}</Heading>

        <div>{children}</div>
      </Box>
    </PageContent>
  </Page>
);

export default PageContainer;
