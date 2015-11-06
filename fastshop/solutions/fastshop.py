string = raw_input()
# double the string to make wrap-around indexing easy
string2 = string + string

candidates = []
for i, value in enumerate(string2):
	if i < len(string):
		# we only need consider candidates really in the original string
		# this check is a nice but not critical performance improvement
		candidates.append(i)

	new_canditates = []
	for j in candidates:
		if not new_canditates:
			new_canditates.append(j)
		else:
			# compare the corresponding element (speicifically, the i-jth one)
			# of this candidate sequence and the previous one
			previous = new_canditates[-1] + i - j
			if previous < j:
				# only consider this candidate if the starting position has not
				# been eclipsed by the checked portion of the other sequence
				# this is critical for sequences like 1212121212
				# because of the optimization, there will only ever be log N canidates
				if value == string2[previous]:
					# this candidate is as good as the previous one
					new_canditates.append(j)
				elif value > string2[previous]:
					# this candidate is better than the previous one, and all
					# other previous ones
					new_canditates = [j]
	candidates = new_canditates

print 1 + candidates[0]
