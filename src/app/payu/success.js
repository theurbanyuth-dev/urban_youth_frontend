useEffect(() => {
  const verify = async () => {
    const res = await fetch(`${baseURL}/order/verify/payu`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(router.query),
    });

    const data = await res.json();

    if (data.success) {
      // Save order
      await addPayUOrder({
        ...orderInfo,
        payu: data.data,
      });

      handleOrderSuccess(data.data, orderInfo);
    }
  };

  verify();
}, []);