import React from 'react';

function PresenterCard({ name, website, image }) {
  return (
    <div style={styles.container}>
      <div style={styles.imageWrapper}>
        <img
          src={image}
          alt={name}
          style={styles.image}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
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
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    width: '50px',
    height: '50px',
  },
  image: {
    width: '80%',
    height: '80%',
    objectFit: 'contain',
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
