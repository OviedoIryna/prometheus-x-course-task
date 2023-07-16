import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="bottomBar">
        <p>
          Виконано в{" "}
          <a
            href="https://prometheus.org.ua"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prometheus
          </a>{" "}
          © 2023
        </p>
      </div>
    </footer>
  );
}

export default Footer;
