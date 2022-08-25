import Container from "./Container";
import SideMenu from "./SideMenu";
import Content from "./Content";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <Container>
      <SideMenu />
      <Content>{children}</Content>
    </Container>
  );
}
