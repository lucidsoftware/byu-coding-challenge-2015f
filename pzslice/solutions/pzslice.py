people_count, pizza_count = map(int, input().split())
pizza_sizes = [int(input()) for _ in range(pizza_count)]

def best_size(min_size, max_size):
	if max_size - min_size < .001:
		return min_size
	slice_size = (min_size + max_size) / 2
	slice_count = sum(pizza_size // slice_size for pizza_size in pizza_sizes)
	if slice_count >= people_count:
		return best_size(slice_size, max_size)
	else:
		return best_size(min_size, slice_size)

print(best_size(0., max(pizza_sizes)))
