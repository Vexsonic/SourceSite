// Initialize when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize highlighting
  hljs.highlightAll();
  
  // Update copyright year
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Initialize the application
  initApp();
});

// Script Repository Data
const scriptRepository = [
  {
    id: 1,
    title: "Date Formatter",
    description: "Format dates in various styles for different regions and locales.",
    language: "javascript",
    code: `function formatDate(date, format = 'short', locale = 'en-US') {
  const options = {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' }
  };
  
  return new Date(date).toLocaleDateString(locale, options[format]);
}

// Example usage:
// formatDate('2023-05-12', 'long');`
  },
  {
    id: 2,
    title: "Array Shuffle",
    description: "Efficiently randomize array elements using the Fisher-Yates algorithm.",
    language: "javascript",
    code: `function shuffleArray(array) {
  const result = [...array];
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
}

// Example usage:
// shuffleArray([1, 2, 3, 4, 5]);`
  },
  {
    id: 3,
    title: "Local Storage Helper",
    description: "Simplify local storage operations with automatic JSON parsing and serialization.",
    language: "javascript",
    code: `const storage = {
  get(key, defaultValue = null) {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
  
  set(key, value) {
    localStorage.setItem(
      key, 
      typeof value === 'object' ? JSON.stringify(value) : value
    );
  },
  
  remove(key) {
    localStorage.removeItem(key);
  },
  
  clear() {
    localStorage.clear();
  }
};`
  },
  {
    id: 4,
    title: "Debounce Function",
    description: "Limit function calls for performance by preventing rapid, repeated executions.",
    language: "javascript",
    code: `function debounce(func, wait = 300) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Example usage:
// const debouncedSearch = debounce((query) => {
//   fetchSearchResults(query);
// }, 500);`
  },
  {
    id: 5,
    title: "Deep Clone",
    description: "Create true deep copies of objects with nested structures.",
    language: "javascript",
    code: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  // Handle Object
  if (obj instanceof Object) {
    const copy = {};
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone(obj[key]);
    });
    return copy;
  }
  
  throw new Error(`Unable to copy object: ${obj}`);
}`
  },
  {
    id: 6,
    title: "String Utilities",
    description: "Helpful string manipulation functions for common text operations.",
    language: "javascript",
    code: `const stringUtils = {
  truncate(str, length = 30, suffix = '...') {
    if (str.length <= length) return str;
    return str.substring(0, length).trim() + suffix;
  },
  
  slugify(str) {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  },
  
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  
  titleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => this.capitalize(word))
      .join(' ');
  }
};`
  }
];

// Initialize the application
function initApp() {
  const searchInput = document.getElementById('searchInput');
  const scriptsGrid = document.getElementById('scriptsGrid');
  const noResults = document.getElementById('noResults');
  const loadingPlaceholder = document.getElementById('loadingPlaceholder');
  const scriptCount = document.getElementById('scriptCount');
  
  // Simulate loading state
  showLoading();
  
  // Initialize scripts after short timeout to simulate loading
  setTimeout(() => {
    // Hide loading placeholders
    loadingPlaceholder.innerHTML = '';
    
    // Render all scripts initially
    renderScripts(scriptRepository);
    
    // Setup search functionality
    searchInput.addEventListener('input', debounce(handleSearch, 300));
  }, 500);
  
  // Function to show loading placeholders
  function showLoading() {
    loadingPlaceholder.innerHTML = '';
    
    // Create 6 loading placeholders
    for (let i = 0; i < 6; i++) {
      const placeholder = document.createElement('div');
      placeholder.className = 'loading-placeholder';
      placeholder.innerHTML = `
        <div class="loading-line"></div>
        <div class="loading-line"></div>
        <div class="loading-line"></div>
      `;
      loadingPlaceholder.appendChild(placeholder);
    }
  }
  
  // Function to handle search input
  function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    // Filter scripts based on search term
    const filteredScripts = scriptRepository.filter(script => {
      return (
        script.title.toLowerCase().includes(searchTerm) ||
        script.description.toLowerCase().includes(searchTerm)
      );
    });
    
    // Render filtered results
    renderScripts(filteredScripts);
  }
  
  // Function to render scripts to the grid
  function renderScripts(scripts) {
    // Update script count
    scriptCount.textContent = scripts.length;
    
    // Clear the grid
    scriptsGrid.innerHTML = '';
    
    // Show/hide no results message
    if (scripts.length === 0) {
      noResults.style.display = 'block';
      scriptsGrid.style.display = 'none';
    } else {
      noResults.style.display = 'none';
      scriptsGrid.style.display = 'grid';
      
      // Append each script card to the grid
      scripts.forEach(script => {
        const card = createScriptCard(script);
        scriptsGrid.appendChild(card);
      });
      
      // Re-initialize syntax highlighting
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
  }
  
  // Function to create a script card element
  function createScriptCard(script) {
    const card = document.createElement('div');
    card.className = 'script-card';
    
    card.innerHTML = `
      <div class="script-card-content">
        <h2 class="script-title">${script.title}</h2>
        <p class="script-description">${script.description}</p>
        <div class="code-block">
          <pre><code class="language-${script.language}">${escapeHtml(script.code)}</code></pre>
          <button class="copy-btn" data-code="${escapeHtml(script.code)}"><i class="far fa-copy"></i> Copy</button>
        </div>
      </div>
    `;
    
    // Add event listener to copy button
    const copyBtn = card.querySelector('.copy-btn');
    copyBtn.addEventListener('click', handleCopy);
    
    return card;
  }
  
  // Function to handle copy button click
  function handleCopy(event) {
    const button = event.currentTarget;
    const code = button.getAttribute('data-code');
    
    // Copy to clipboard
    navigator.clipboard.writeText(code)
      .then(() => {
        showToast();
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  }
  
  // Function to show toast notification
  function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Helper function to escape HTML special characters
function escapeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

// Debounce function to limit execution of functions
function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
