

<svg width="{.width}" height="{.height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<desc>Created with Snap</desc>
<g>
<circle cx="{.cx}" cy="{.cy}" r="{.r}" fill="#585858" stroke="#000000" style="stroke-width: 1; cursor: pointer;"></circle>
{#wells}
	<g id="{.id}">
		<circle cx="{.cx}" cy="{.cy}" r="{.r}" fill="{.fill}" stroke="#000000" style="stroke-width: 1;"></circle>
		<text x="{.cx}" y="{.cy}" style="font-size:{.fontSize};" fill="{.fontColor}">{.label}</text>
	</g>
{/wells}


</svg>
