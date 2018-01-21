import './loading.scss';
export default function(id = '', text = '正在载入...', extraClass = '') {
  return `<section class="ly-loading ${extraClass}" id="${id}">
  <article><i class="fa fa-spinner fa-pulse icon-2x"></i></article>
  <p>${text}</p>
</section>`;
}

