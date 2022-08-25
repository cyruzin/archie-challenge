interface ContentProps {
  children: React.ReactNode;
}

export default function Content(props: ContentProps) {
  const { children } = props;

  return <div className="content">{children}</div>;
}
