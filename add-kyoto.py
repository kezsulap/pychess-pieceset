with open('custom-pieces.css', 'r') as f:
	content = f.read().split('\n')

for line in content:
	if '.kyoto' in line:
		if '{' in line:
			bracket = True
			line = line.replace('{', '')
		else:
			bracket = False
		parts = line.split(',')
		new_parts = []
		for part in parts:
			part = part.strip()
			new_parts.append(part)
			replaces_base = {
				'.kyoto' : '.variant-kyotoshogi',
				'black' : 'gote',
				'white' : 'sente',
				'cg-wrap': 'sg-wrap',
				'.p-piece': '.pawn',
				'.pp-piece': '.rook',
				'.n-piece': '.knight',
				'.pn-piece': '.gold',
				'.l-piece': '.lance',
				'.pl-piece': '.tokin',
				'.s-piece': '.silver',
				'.ps-piece': '.bishop',
				'.k-piece': '.king',
				'.pocket': '.pocket',
				'.pocket.': '.pocket.',
				'.spare.top': '.spare-top',
				'.spare.bottom': '.spare-bottom',
			}
			replaces_a = replaces_base.copy()
			replaces_b = replaces_base.copy()
			replaces_a['.pocket'] = '.spare'
			replaces_b['.pocket.'] = '.hand-'
			part_a = part
			part_b = part
			for k, v in replaces_a.items():
				part_a = part_a.replace(k, v)
			for k, v in replaces_b.items():
				part_b = part_b.replace(k, v)
			new_parts.append(part_a)
			if part_a != part_b:
				new_parts.append(part_b)
		print(', '.join(new_parts) + ('{' if bracket else ''))
	else:
		print(line)
