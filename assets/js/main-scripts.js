const contentMap = {
  '#main': './pages/main.html',
  '#about': './pages/about.html',
  '#activities': './pages/activities.html',
  '#activities/detailed': './pages/detailed_activities.html',
  '#media': './pages/media_center.html',
  '#media/detailed': './pages/detailed_news.html',
  '#services': './pages/services.html',
  '#services/detailed': './pages/services_detailed.html',
  '#publications': './pages/publications.html',
  '#contactus': './pages/contact_us.html',
};

function loadContent( file, parent_file ) {
  if( file ) {
    fetch( file )
      .then( response => {
        if( !response.ok ) {
          throw new Error( `HTTP error! Status: ${response.status}` );
        }
        return response.text();
      } )
      .then( data => {
        if( parent_file === './pages/about.html' || file === './pages/about.html' ) {
          loadComponent( "./pages/resuable_component/inside_header.html", "inside-header", {
            title: "عن الهيئة",
            tabs: ['عن الهيئة', 'اختصاصات الهيئة', 'كلمة رئيس الهيئة', 'مجلس الإدارة', 'رؤساء الهيئة السابقين', 'الهيكل التنظيمي',
              'القوانين واللوائح']
          }, parent_file );
        }

        if( parent_file === './pages/activities.html' || file === './pages/activities.html' ) {
          loadComponent( "./pages/resuable_component/inside_header.html", "inside-header", {
            title: "أنشطة الهيئة", tabs: ['المشروعات', 'الفرص الاستثمارية', 'المعامل']
          }, parent_file );
        }

        if( parent_file === './pages/media_center.html' || file === './pages/media_center.html' ) {
          loadComponent( "./pages/resuable_component/inside_header.html", "inside-header", {
            title: "المركز الاعلامي", tabs: ['الاخبار', 'الاعلانات', 'معرض الفيديوهات', 'معرض الصور']
          }, parent_file );
        }

        if( parent_file === './pages/services.html' || file === './pages/services.html' ) {
          loadComponent( "./pages/resuable_component/inside_header.html", "inside-header", {
            title: "الخدمات", tabs: []
          }, parent_file );
        }

        if( parent_file === './pages/publications.html' || file === './pages/publications.html' ) {
          loadComponent( "./pages/resuable_component/inside_header.html", "inside-header", {
            title: "إصدارات الهيئة", tabs: ['بيانات إحصائية', 'دراسات الجدوى', 'الكتيبات الاسترشادية']
          }, parent_file );
        }

        if( parent_file === './pages/contact_us.html' || file === './pages/contact_us.html' ) {
          loadComponent( "./pages/resuable_component/inside_header.html", "inside-header", {
            title: "يمكننا المساعدة", tabs: ['تواصل معنا', 'الاسئلة الشائعة']
          }, parent_file );
        }
        document.getElementById( 'main-body' ).innerHTML = data;
        loadAllContentWhenNavigate();
      } )
      .catch( err => console.error( 'Error loading content:', err ) );
  }
}

// Function to load reusable component and pass data
async function loadComponent( url, placeholderId, data, parent_file ) {
  try {
    const response = await fetch( url );

    if( !response.ok ) {
      throw new Error( `HTTP error! Status: ${response.status}` );
    }

    const componentHTML = await response.text();

    // Parse and inject the component
    const parser = new DOMParser();
    const doc = parser.parseFromString( componentHTML, "text/html" );

    // Inject the title
    const titleElement = doc.getElementById( "component-title" );
    const tabsElements = doc.getElementById( "render_tabs" );
    if( titleElement ) {
      titleElement.textContent = data.title;
    }
    else {
      console.warn( "Title element not found in the component." );
    }

    if( tabsElements ) {
      // Loop through the tab data to create tabs and panes
      data.tabs?.forEach( ( tabName, index ) => {
        // Create and append tab element
        const tabElement = document.createElement( "div" );
        tabElement.classList.add( "tabs_list_item", "tw-py-3", "tw-text-primary", "tw-border-b-2", "tw-cursor-pointer",
          "tw-border-transparent", "hover:tw-border-b-2", "hover:tw-border-secondary" );
        tabElement.textContent = tabName;
        tabElement.setAttribute( "data-index", index );
        tabsElements.appendChild( tabElement );
      } );
    }

    // Inject into the placeholder
    const placeholder = document.getElementById( placeholderId );
    if( placeholder ) {
      placeholder.innerHTML = doc.body.innerHTML;
    }
    else {
      console.error( "Placeholder not found:", placeholderId );
    }
  }
  catch( error ) {
    console.error( "Error in loadComponent:", error );
  }
}

function setupNavigation() {
  const navLinks = document.querySelectorAll( '.nav-link' );

  // Load content for the default page
  const currentPath = window.location.pathname;
  const initialPage = currentPath === '/Portal/index.html' || currentPath === '/' ? contentMap['#main'] : contentMap[contentMap];

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

function navigateToDetailedPage( href, data ) {
  const detailed_flag = href.split( '/' )[1] === 'detailed';
  const parent_href = href.split( '/' )[0];
  // Update URL in the address bar without reloading the page
  window.history.pushState( {}, '', href );

  // Load the new content
  loadContent( contentMap[href], contentMap[parent_href] );
}

function filterTab( type ) {
  const filteredByTabs = document.querySelectorAll( '.filtered-by-tab' );
  const filterTabs = document.querySelectorAll( '.filter-tab' );

  filterTabs.forEach( ( tab ) => {
    const dataItems = tab.getAttribute( 'data-items' );
    const spanElement = tab.querySelector( 'span' );

    if( dataItems === type ) {
      tab.classList.add( 'tw-bg-primary' );
      spanElement.classList.add( 'tw-text-white-100' );
      tab.classList.remove( 'tw-bg-transparent' );
      spanElement.classList.remove( 'tw-text-text' );
    }
    else {
      tab.classList.add( 'tw-bg-transparent' );
      spanElement.classList.add( 'tw-text-text' );
      tab.classList.remove( 'tw-bg-primary' );
      spanElement.classList.remove( 'tw-text-white-100' );
    }
  } );
  filteredByTabs.forEach( ( tab ) => {
    const dataItems = tab.getAttribute( 'data-items' );
    if( type === 'all' ) {
      tab.classList.remove( 'tw-hidden' );
      tab.classList.add( 'tw-visible' );
    }
    else {
      if( dataItems === type ) {
        tab.classList.add( 'tw-visible' );
        tab.classList.remove( 'tw-hidden' );
      }
      else {
        tab.classList.add( 'tw-hidden' );
        tab.classList.remove( 'tw-visible' );
      }
    }
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
    const $testimonialsControl = $( ".testimonials-control" );
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

    $testimonialsControl.on( "mouseleave", function () {
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

    const tabs = document.querySelectorAll( ".tabs_list_item" );
    const panes = document.querySelectorAll( ".pane" );

    if( tabs && panes ) {
      tabs.forEach( ( t ) => t.classList.remove( "!tw-border-secondary" ) );
      panes.forEach( ( pane ) => pane.classList.add( "tw-hidden" ) );

      // Add click event listener to each tab
      tabs.forEach( ( tab, index ) => {
        tab.addEventListener( "click", () => {
          // Remove 'active' class from all tabs and hide all panes
          tabs.forEach( ( t ) => t.classList.remove( "!tw-border-secondary" ) );
          panes.forEach( ( pane ) => pane.classList.add( "tw-hidden" ) );

          // Add 'active' class to clicked tab and show corresponding pane
          tab.classList.add( "!tw-border-secondary" );
          panes[index].classList.remove( "tw-hidden" );
        } );
      } );

      // Initialize the first tab and pane as active
      tabs[0]?.classList.add( "!tw-border-secondary" );
      panes[0]?.classList.remove( "tw-hidden" );
    }

    const horizontalTabs = document.querySelectorAll( ".horizontal_tabs" );
    const contents_horizontal_tabs = document.querySelectorAll( ".contents_horizontal_tabs" );

    if( horizontalTabs && contents_horizontal_tabs ) {
      horizontalTabs.forEach( ( t ) => t.classList.remove( "tw-bg-gray-secondary", "!tw-border-primary" ) );

      // Add click event listener to each tab
      horizontalTabs.forEach( ( el, index ) => {
        el.addEventListener( 'click', function () {
          horizontalTabs.forEach( ( t ) => t.classList.remove( "tw-bg-gray-secondary", "!tw-border-primary" ) );

          const targetSection = contents_horizontal_tabs[index]; // Get the corresponding section based on the index of the tab
          targetSection.scrollIntoView( {
            behavior: 'smooth', // Scroll smoothly
            block: 'start' // Align to the top of the section
          } );

          el.classList.add( "tw-bg-gray-secondary", "!tw-border-primary" );
        } );
      } );

      // Initialize the first tab and pane as active
      horizontalTabs[0]?.classList.add( "tw-bg-gray-secondary", "!tw-border-primary" );
    }

    $( '.detailed-slider' ).slick( {
      rtl: true,
      dots: false,
      infinite: true,
      autoplay: true,
      centerPadding: '10%',
      autoplaySpeed: 2500,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><i class="bi bi-chevron-right"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="bi bi-chevron-left"></i></button>',
      slidesToShow: 1.675,
      slidesToScroll: 1,
    } );
    $( '.detailed-slider' ).slick( 'setPosition' );

    filterTab( 'all' )

    // Select the form
    const form = document.querySelector(".contactUs form");

    // Handle the form's submit event
    form?.addEventListener("submit", (event) => {
      // Prevent the form from submitting to the server
      event.preventDefault();

      // Collect form data
      const fullName = form.querySelector('input[placeholder="الاسم بالكامل"]').value;
      const phoneNumber = form.querySelector('input[placeholder="رقم التليفون"]').value;
      const email = form.querySelector('input[placeholder="البريد الالكتروني"]').value;
      const comment = form.querySelector('textarea[placeholder="تعليقك"]').value;
      const isNotRobot = form.querySelector('input[type="checkbox"]').checked;

      // Create an object with the collected data
      const formData = {
        fullName,
        phoneNumber,
        email,
        comment,
        isNotRobot
      };

      // Log the form data to the console
      console.log("Collected Form Data:", formData);

      // You can send the data to the server here (e.g., using fetch or axios)
    });
  }, 200 ); // adjust the delay as necessary
}

// Call loadContent on page load
window.onload = () => {
  setupNavigation();
};
