---
paths:
  - "*.html"
  - "static/js/script.js"
---

# Backend-Compatible HTML Patterns

These patterns must be followed exactly — the backend developer expects this structure for PHP integration.

## Apartment Table

```html
<table class="apartment-table">
  <thead>
    <tr>
      <th>Nr.</th>
      <th>Kambariai</th>
      <th>Plotas</th>
      <th>Kaina</th>
      <th>Statusas</th>
    </tr>
  </thead>
  <tbody>
    <!-- PHP: loop through apartments -->
    <tr class="tr-status-available" data-apartment-id="apt-a-101">
      <td>A-101</td>
      <td>2</td>
      <td>54.2 m²</td>
      <td>125 000 €</td>
      <td><span class="status-badge">Laisvas</span></td>
    </tr>
    <!-- Status classes: tr-status-available, tr-status-reserved, tr-status-sold -->
  </tbody>
</table>
```

## SVG Interactive Map

```html
<div class="svg-hold">
  <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <g class="korpusai">
      <g id="building-a" class="building-group">
        <polygon id="apt-a-101" class="apartment-polygon status-available"
                 points="100,200 200,200 200,300 100,300" />
        <polygon id="apt-a-102" class="apartment-polygon status-reserved"
                 points="200,200 300,200 300,300 200,300" />
      </g>
    </g>
  </svg>
</div>
```

## Form Structure

```html
<form method="post" action="/submit-reservation">
  <fieldset class="user-form">
    <div class="field">
      <label for="name">Vardas</label>
      <input type="text" id="name" name="name" required />
    </div>
    <div class="field">
      <label for="phone">Telefonas</label>
      <input type="tel" id="phone" name="phone" required />
    </div>
    <div class="field">
      <label for="date">Data</label>
      <input type="text" id="date" name="date" class="datepicker" />
    </div>
    <button type="submit" class="btn btn-primary">Siųsti</button>
  </fieldset>
</form>
```

## Filter Form

```html
<form method="get" action="/butai" class="filter-form">
  <div class="filter-group">
    <label>Kambariai:</label>
    <label><input type="checkbox" name="rooms[]" value="1" /> 1</label>
    <label><input type="checkbox" name="rooms[]" value="2" /> 2</label>
    <label><input type="checkbox" name="rooms[]" value="3" /> 3</label>
    <label><input type="checkbox" name="rooms[]" value="4" /> 4+</label>
  </div>
  <div class="filter-group">
    <label>Statusas:</label>
    <label><input type="checkbox" name="status[]" value="available" /> Laisvas</label>
    <label><input type="checkbox" name="status[]" value="reserved" /> Rezervuotas</label>
  </div>
  <button type="submit" class="btn btn-outline-primary">Filtruoti</button>
</form>
```

## Google Maps Container

```html
<div class="map-holder">
  <div id="gmap" style="width:100%; height:450px;"></div>
</div>
```
