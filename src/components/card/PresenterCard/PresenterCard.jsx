import React from 'react';

function PresenterCard({ name, website, image }) {
  return (
    <div style={styles.container}>
      <img src={image} alt={name} style={styles.image} />
      <div style={styles.textContainer}>
        <p style={styles.name}>{name}</p>
        {website?.trim() && (
          <a href={website} style={styles.link} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '8px',
  },
  image: {
    borderRadius: '50px',
    width: '46px',
    height: '46px',
    objectFit: 'cover',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 'var(--presenter-font-size)',
    fontWeight: 'var(--presenter-font-weight)',
    color: 'var(--secondary-black)',
    margin: '0px',
  },
  link: {
    fontSize: 'var(--presenter-link-size)',
    fontWeight: 'var(--presenter-link-weight)',
    color: 'var(--presenter-link-color)',
    textDecoration: 'none',
  },
};

export default PresenterCard;
