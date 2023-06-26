interface BoredSiteProps {
  url: string;
  active: boolean;
  setActive: () => void;
}

const BoredSite = (props: BoredSiteProps) => {
  return (
    <div className="bored-site" onClick={() => props.setActive()}>
      {!props.active && <div />}
      <iframe src={props.url} title="description" />
    </div>
  );
};

export default BoredSite;
