import React, { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Meta } from '../components/common/Meta';
import { RollLabel } from '../components/common/Button';
import { ProductGallery } from '../components/products/ProductGallery';
import { ProductGrid } from '../components/products/ProductGrid';
import { DEMO_PRODUCTS } from '../data/products';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = useMemo(() => DEMO_PRODUCTS.find((item) => item.slug === slug), [slug]);
  const [finishId, setFinishId] = useState(() => {
    const picturedFinish = product?.finishes.find((item) => product.imagesByFinish?.[item.id]);
    return picturedFinish?.id ?? product?.finishes[0]?.id ?? '';
  });
  if (!product) return <Navigate to="/products" replace />;

  const finish = product.finishes.find((item) => item.id === finishId) ?? product.finishes[0];
  const photo = finish ? product.imagesByFinish?.[finish.id] : product.images[0];
  const related = DEMO_PRODUCTS.filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id).slice(0, 4);
  const quoteHref = `/trade-desk?product=${encodeURIComponent(product.name)}&series=${encodeURIComponent(product.series)}${finish ? `&finish=${encodeURIComponent(finish.name)}` : ''}`;

  return <div className="product-detail">
    <Meta title={`${product.name} — SIDDI`} description={`${product.name} product information and available finishes.`} ogImage={photo} />
    <div className="spec-container product-detail__container">
      <nav className="catalogue__breadcrumb mono-label" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/products">Catalogue</Link><span>/</span><span aria-current="page">{product.name}</span></nav>
      <div className="product-detail__overview">
        <ProductGallery images={photo ? [photo] : []} productName={product.name} selectedFinishName={finish?.name} photoNeeded={product.photoNeeded} />
        <section className="product-detail__summary">
          <h1>{product.name}</h1>
          <p>{product.shortDescription || `Demonstration catalogue entry for ${product.category.toLowerCase()}.`} Confirm dimensions, materials and performance with the SIDDI trade desk before specification.</p>
          <div className="product-detail__group">
            <h2 className="mono-label">Available finishes</h2>
            <div className="product-detail__finishes">{product.finishes.map((item) => <button key={item.id} type="button" className={`product-detail__finish${finish?.id === item.id ? ' is-selected' : ''}`} aria-pressed={finish?.id === item.id} onClick={() => setFinishId(item.id)}><span style={{ backgroundColor: item.hex }} />{item.name}</button>)}</div>
            {finish && !product.imagesByFinish?.[finish.id] && <p className="product-detail__note">A product photograph for {finish.name} is pending.</p>}
          </div>
          <div className="product-detail__actions"><Link className="btn-roll btn-primary" to={quoteHref}><RollLabel>Request a quote</RollLabel></Link><a className="btn-roll btn-outline" href="#downloads"><RollLabel>Download CAD and BIM</RollLabel></a></div>
          <section className="product-detail__specs"><h2 className="mono-label">Specifications</h2>{Object.keys(product.specs ?? {}).length ? <dl>{Object.entries(product.specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl> : <p>Specifications are pending confirmation. Contact the trade desk for current product information.</p>}</section>
          <section className="product-detail__downloads" id="downloads"><h2 className="mono-label">Downloads</h2>{product.downloads?.length ? <ul>{product.downloads.map((file) => <li key={file.label}><a href={file.url}>{file.label} <span>{file.format}{file.size ? ` · ${file.size}` : ''}</span></a></li>)}</ul> : <p>CAD and BIM files are not published yet. <Link to={quoteHref}>Request files from the trade desk.</Link></p>}</section>
        </section>
      </div>
      <section className="product-detail__related"><h2>Related products</h2>{related.length ? <ProductGrid products={related} columns={4} className="product-detail__related-grid" /> : <p>No related products are listed yet.</p>}</section>
    </div>
  </div>;
};
