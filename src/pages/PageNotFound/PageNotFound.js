import ErrorMessage from "../../components/Error/Error";
import Main from "../../components/Main/Main";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

const PageNotFound = () => {
  return (
    <>
      <NavigationBar />
      <Main>
        <ErrorMessage error={"Page not found!"} />
      </Main>
    </>
  );
};

export default PageNotFound;
