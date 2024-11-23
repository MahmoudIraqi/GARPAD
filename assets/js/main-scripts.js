function loadContent( file ) {
  if( file ) {
    fetch( file )
      .then( response => {
        if( !response.ok ) {
          throw new Error( `HTTP error! Status: ${response.status}` );
        }
        return response.text();
      } )
      .then( data => {
        document.getElementById( 'main-body' ).innerHTML = data;
        loadAllContentWhenNavigate()
      } )
      .catch( err => console.error( 'Error loading content:', err ) );
  }
}

function setupNavigation() {
  const navLinks = document.querySelectorAll( '.nav-link' );

  // Load content for the default page
  const currentPath = window.location.pathname;
  const contentMap = {
    '#main': './pages/main.html',
    '#about': './pages/about.html'
  };
  const initialPage = currentPath === '/Portal/index.html' ? contentMap['#main'] : contentMap[contentMap];

  loadContent( initialPage );
  loadAllContentWhenNavigate()

  navLinks.forEach( link => {
    link.addEventListener( 'click', ( event ) => {
      event.preventDefault(); // Prevent default link behavior
      const href = link.getAttribute( 'href' );
      // Update URL in the address bar without reloading the page
      window.history.pushState( {}, '', href );

      // Load the new content
      loadContent( contentMap[href] );

      // Highlight the active link
      navLinks.forEach( nav => nav.classList.remove(
        '!tw-text-yellow-main',
        '!tw-font-bold',
        'hover:!tw-bg-white-100',
        'hover:!tw-text-primary',
        'hover:!tw-rounded-full'
      ) );
      link.classList.add(
        '!tw-text-yellow-main',
        '!tw-font-bold',
        'hover:!tw-bg-white-100',
        'hover:!tw-text-primary',
        'hover:!tw-rounded-full'
      );
    } );
  } );
}

function loadAllContentWhenNavigate() {
  // Use setTimeout to delay the execution and see if elements load after a delay
  setTimeout( () => {
    let testimonialIndex = 0;
    let pauseSlide = false;
    let testimonialsInterval = null;
    const $testimonialsElement = $( ".testimonials" );
    let testimonialsDelay = Number( $testimonialsElement.data( "delay" ) ) || 24000;
    const $testimonialsBadgeElement = $( ".testimonials-badge" );
    const $testimonialsNoStartElement = $( ".testimonials.no-start" );
    const $slideItemsElement = $( ".testimonials-text" );
    const $dataItems = Number( $( '.testimonials' ).data( 'items' ) );

    if( $testimonialsElement && $testimonialsNoStartElement.length === 0 ) {
      carousel();
    }

    if( $testimonialsNoStartElement && $testimonialsNoStartElement.length === 1 ) {
      $testimonialsBadgeElement.each( ( index, element ) => {
        $( $testimonialsBadgeElement[index] ).css( "display", "none" );
      } );
      document.getElementsByClassName(
        "testimonials-text"
      )[0].style.display = "block";
    }

    function showSlideItem( $slideItemsElement, testimonialIndex, $, $testimonialsBadgeElement ) {
      if( !$slideItemsElement ) {
        return;
      }
      if( $slideItemsElement[testimonialIndex - 1] ) {
        $slideItemsElement[testimonialIndex - 1].style.display = "block";
        $( $testimonialsBadgeElement[testimonialIndex - 1] ).attr(
          "style",
          "background: #FFF !important; height: 25px;"
        );
      }
    }

    function stopAutoLoad() {
      clearInterval( testimonialsInterval );
      testimonialsInterval = null;
    }

    function carousel() {
      let i;

      let slideItemsLength = $slideItemsElement.length;
      for( i = 0; i < slideItemsLength; i++ ) {
        $slideItemsElement[i].style.display = "none";
        $( $testimonialsBadgeElement[i] ).attr(
          "style",
          "background: rgba(255, 255, 255, 0.2) !important"
        );
      }

      if( !$slideItemsElement ) {
        return;
      }
      if( !pauseSlide ) {
        if( testimonialIndex < $dataItems ) {
          testimonialIndex++;
          showSlideItem( $slideItemsElement, testimonialIndex, $, $testimonialsBadgeElement );
        }
        else {
          testimonialIndex = 1;
          showSlideItem( $slideItemsElement, testimonialIndex, $, $testimonialsBadgeElement );
        }
      }
      else {
        showSlideItem( $slideItemsElement, testimonialIndex, $, $testimonialsBadgeElement );
      }
      if( testimonialsInterval !== null ) {
        return;
      }
      testimonialsInterval = setInterval( carousel, testimonialsDelay );
    }

    $testimonialsBadgeElement.on( "click", function ( e ) {
      e.preventDefault();

      console.log( '1234', this )
      const n = $( this ).data( "index" );

      stopAutoLoad();

      testimonialIndex = n;

      $( $slideItemsElement[n] )
        .attr( "style", "display: block !important" )
        .siblings()
        .attr( "style", "display: none !important" );

      $( this )
        .attr( "style", "background: #DDD6CC !important" )
        .siblings()
        .attr( "style", "background: #fff; !important" );
    } );

    $( ".testimonials-control" ).on( "mouseleave", function () {
      if(
        testimonialsInterval == null &&
        $testimonialsNoStartElement.length === 0
      ) {
        pauseSlide = false;
        carousel();
      }
    } );

    $( '.latest-items-product' ).slick( {
      rtl: true,
      dots: false,
      infinite: false,
      autoplay: false,
      autoplaySpeed: 2500,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><i class="bi bi-chevron-right"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="bi bi-chevron-left"></i></button>',
      slidesToShow: 4.5,
      slidesToScroll: 1,
    } );

    $( '.latest-items-projects' ).slick( {
      rtl: true,
      dots: false,
      infinite: false,
      autoplay: false,
      autoplaySpeed: 2500,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><i class="bi bi-chevron-right"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="bi bi-chevron-left"></i></button>',
      slidesToShow: 1,
      slidesToScroll: 1,
    } );
  }, 200 ); // adjust the delay as necessary
}

// Call loadContent on page load
window.onload = () => {
  setupNavigation();
};
