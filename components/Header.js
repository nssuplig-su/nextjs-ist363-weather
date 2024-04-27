import styles from "./Header.module.scss";
import Logo from "./Logo";
import Container from "./Container";
import Row from "./Row";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <Row>
          <Logo />
        </Row>
      </Container>
    </header>
  );
};

export default Header;
