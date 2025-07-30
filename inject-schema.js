(function () {
  const script = document.createElement('script');
  script.type = 'application/ld+json';

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.rbccm.com/en/gib/industry-coverage.page",
        "name": "Industry Coverage | RBC Capital Markets",
        "url": "https://www.rbccm.com/en/gib/industry-coverage.page",
        "description": "Explore RBC Capital Markets’ investment banking expertise across a range of industries including Energy, Healthcare, Infrastructure, Real Estate, Technology, and more.",
        "publisher": {
          "@id": "https://www.rbccm.com/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.rbccm.com/en/home.page"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Global Investment Banking",
            "item": "https://www.rbccm.com/en/gib/global-investment-banking.page"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Industry Coverage",
            "item": "https://www.rbccm.com/en/gib/industry-coverage.page"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.rbccm.com/#organization",
        "name": "RBC Capital Markets",
        "url": "https://www.rbccm.com"
      },
      {
        "@type": "Service",
        "name": "Industry-Focused Investment Banking Services",
        "serviceType": "Sector-Specific Advisory and Financing",
        "provider": {
          "@id": "https://www.rbccm.com/#organization"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Global"
        },
        "description": "RBC Capital Markets delivers tailored investment banking solutions across diverse sectors such as Energy, Healthcare, Infrastructure, Real Estate, Technology, and more.",
        "mainEntityOfPage": {
          "@id": "https://www.rbccm.com/en/gib/industry-coverage.page"
        }
      }
    ]
  });

  document.head.appendChild(script);
})();