const Footer: React.FC = () => {
    return (
      <footer className=" text-white py-8 align-text-bottom">
        <div className="container mx-auto text-center">
          <p className="mb-4">© {new Date().getFullYear()} ZestWear. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  