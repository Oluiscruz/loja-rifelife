import '../../styles/produtos.scss';
import { AdvancedImage } from '@cloudinary/react';
import Carrosel from '../home/carrosel';
import Categorias from '../categoria/categorias.jsx';
import { images } from '../../assets/products/cloudnary/image.jsx';

export default function Section({ searchResults }) {
  return <main id="inicio">
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">SUA MELHOR VERSÃO COMEÇA HOJE</span>
        <h1>Energia para ir <em>além.</em></h1>
        <p>Suplementos selecionados para acompanhar o ritmo dos seus objetivos.</p>
        <a className="primary-button" href="#produtos">Comprar agora <span>→</span></a>
        <div className="hero-trust">
          <span><b>+10 mil</b> clientes satisfeitos</span>
          <span><b>Compra segura</b> e entrega rápida</span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-orbit orbit-one"></div>
        <div className="hero-orbit orbit-two"></div>
        <span className="hero-pill">WHEY PROTEIN<br /><b>100% ORIGINAL</b></span>
        <AdvancedImage cldImg={images.banner} alt="Pote de suplemento Rife Life" />
      </div>

    </section>

    <section className="benefits">
      <div><span>↗</span><p><strong>Entrega expressa</strong>Receba em todo o Pernambuco</p></div>
      <div><span>▣</span><p><strong>Pagamento seguro</strong>Seus dados protegidos</p></div>
      <div><span>↻</span><p><strong>Compra garantida</strong>Até 7 dias para trocar</p></div>
      <div><span>✦</span><p><strong>Produtos originais</strong>Qualidade comprovada</p></div>
    </section>
    <div className="content-wrap">
      {searchResults && (
        <section className="search-showcase" aria-live="polite">
          <div className="section-heading">
            <div>
              <span className="eyebrow">RESULTADO DA BUSCA</span>
              <h2>
                {searchResults.type === 'similar' ? 'Encontramos opções para você' : 'Confira estes produtos'}
              </h2>
              <p className="search-showcase-term">Busca por “{searchResults.term}”</p>
            </div>
          </div>
          <Carrosel products={searchResults.products} />
        </section>
      )}
      <Categorias />
      <section className="showcase" id="produtos">
        <div className="section-heading">
          <div><span className="eyebrow">OS QUERIDINHOS</span>
            <h2>Mais vendidos da <em>semana</em></h2>
          </div>
          <a href="#produtos">Ver todos os produtos <span>→</span></a>
        </div>
        <Carrosel />
      </section>
      <section className="newsletter" id="ofertas">
        <div><span className="eyebrow">CLUBE RIFE LIFE</span><h2>Ofertas e conteúdo para a sua rotina.</h2></div>
        <form><input aria-label="Seu melhor e-mail" type="email" placeholder="Digite seu melhor e-mail" />
          <button type="submit">Quero receber</button>
        </form>
      </section>
    </div>
  </main>;
}
