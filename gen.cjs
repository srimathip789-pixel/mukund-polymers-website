const fs = require('fs');
const path = require('path');

const categories = [
  {
    title: 'Rubber Crumb Powder & Granules',
    desc: 'EPDM, Tyre Powder, Buffing Powder, and Rubber Granules available in 10, 14, 20, 24, 30, 40 Mesh condition.',
    folder: 'Rubber crumb powder'
  },
  {
    title: 'Rubber Mats',
    desc: 'Cowmat, Gym Mats, Electric Mat, Flooring Mat, EVA & Interlock Mat. For Indoor and Outdoor use.',
    folder: 'Rubbermat.cowmat'
  },
  {
    title: 'Artificial Grass',
    desc: 'For Sports grounds like Cricket, Football, and Multi-Sports Grounds. Various sizes available.',
    folder: 'Artifical gross'
  },
  {
    title: 'Rubber Tiles',
    desc: 'For Gym, Aerographics, and Dance. Interlocking type suitable for all sports, Outdoor and Indoor.',
    folder: 'Rubber tiles'
  },
  {
    title: 'Other Services',
    desc: 'We also buy and sell used Rubber Machineries.',
    folder: 'Other services'
  }
];

let html = `        <!-- Products Gallery -->\n        <div class="product-categories">\n`;

categories.forEach(cat => {
  html += `          <div class="product-section mt-5">\n`;
  html += `            <h3 class="category-title">${cat.title}</h3>\n`;
  html += `            <p class="category-desc">${cat.desc}</p>\n`;
  html += `            <div class="product-grid">\n`;
  
  const folderPath = path.join(__dirname, 'public', 'assets', cat.folder);
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));
    files.forEach(file => {
      html += `              <div class="product-card">\n`;
      html += `                <div class="card-img">\n`;
      html += `                  <img src="/assets/${encodeURIComponent(cat.folder)}/${encodeURIComponent(file)}" alt="${cat.title}">\n`;
      html += `                </div>\n`;
      html += `                <div class="card-content">\n`;
      html += `                  <h4>${cat.title}</h4>\n`;
      html += `                  <p>${cat.desc}</p>\n`;
      html += `                </div>\n`;
      html += `              </div>\n`;
    });
  }
  
  html += `            </div>\n`;
  html += `          </div>\n`;
});

html += `        </div>`;

const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

const startMarker1 = '<!-- Products Grid -->';
const startMarker2 = '<!-- Products Gallery -->';
const endMarker = '<!-- Contact Section -->';

let startIndex = indexContent.indexOf(startMarker2);
if (startIndex === -1) {
    startIndex = indexContent.indexOf(startMarker1);
}
const endIndex = indexContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = indexContent.substring(0, startIndex) + html + '\n\n    ' + indexContent.substring(endIndex);
  fs.writeFileSync(indexPath, newContent);
  console.log('index.html updated successfully!');
} else {
  console.log('Could not find markers in index.html');
}
