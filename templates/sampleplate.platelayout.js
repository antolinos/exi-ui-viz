

<svg id="{.id}" width="{.width}" height="{.height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g>
<rect width="{.width}" height="{.height}"  rx="10" ry="10" fill="#585858" stroke="#000000" style="stroke-width: 1; cursor: pointer;"></rect>
{#wells}
	<g id="{.id}">
		<rect width="{.r}" height="{.r}"  x="{.cx}" y="{.cy}" fill="{.fill}" stroke="#000000" style="stroke-width: 1; cursor: pointer;"></rect>
		<text x="{.labelcx}" y="{.labelcy}" style="font-size:{.fontSize};" fill="{.fontColor}">{.label}</text>
	</g>
{/wells}


</svg>
