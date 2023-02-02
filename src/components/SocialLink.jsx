const SocialLink = ({ href, icon }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <i className={`fl-icon-${icon}`}></i>
    </a>
  );
};

export default SocialLink;
