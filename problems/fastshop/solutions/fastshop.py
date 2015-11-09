string = raw_input()
string2 = string + string

candidates = []
for i, value in enumerate(string2):
	if i < len(string):z
		candidates.append(i)

	new_canditates = []
	for j in candidates:
		if not new_canditates:
			new_canditates.append(j)
		else:
			previous = new_canditates[-1] + i - j
			if previous < j:
				if value == string2[previous]:
					new_canditates.append(j)
				elif value > string2[previous]:
					new_canditates = [j]
	candidates = new_canditates
	print candidates

print 1 + candidates[0]
